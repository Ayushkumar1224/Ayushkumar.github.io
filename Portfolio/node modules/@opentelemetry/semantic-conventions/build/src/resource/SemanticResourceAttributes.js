"use strict";
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEMRESATTRS_K8S_STATEFULSET_NAME = exports.SEMRESATTRS_K8S_STATEFULSET_UID = exports.SEMRESATTRS_K8S_DEPLOYMENT_NAME = exports.SEMRESATTRS_K8S_DEPLOYMENT_UID = exports.SEMRESATTRS_K8S_REPLICASET_NAME = exports.SEMRESATTRS_K8S_REPLICASET_UID = exports.SEMRESATTRS_K8S_CONTAINER_NAME = exports.SEMRESATTRS_K8S_POD_NAME = exports.SEMRESATTRS_K8S_POD_UID = exports.SEMRESATTRS_K8S_NAMESPACE_NAME = exports.SEMRESATTRS_K8S_NODE_UID = exports.SEMRESATTRS_K8S_NODE_NAME = exports.SEMRESATTRS_K8S_CLUSTER_NAME = exports.SEMRESATTRS_HOST_IMAGE_VERSION = exports.SEMRESATTRS_HOST_IMAGE_ID = exports.SEMRESATTRS_HOST_IMAGE_NAME = exports.SEMRESATTRS_HOST_ARCH = exports.SEMRESATTRS_HOST_TYPE = exports.SEMRESATTRS_HOST_NAME = exports.SEMRESATTRS_HOST_ID = exports.SEMRESATTRS_FAAS_MAX_MEMORY = exports.SEMRESATTRS_FAAS_INSTANCE = exports.SEMRESATTRS_FAAS_VERSION = exports.SEMRESATTRS_FAAS_ID = exports.SEMRESATTRS_FAAS_NAME = exports.SEMRESATTRS_DEVICE_MODEL_NAME = exports.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = exports.SEMRESATTRS_DEVICE_ID = exports.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = exports.SEMRESATTRS_CONTAINER_IMAGE_TAG = exports.SEMRESATTRS_CONTAINER_IMAGE_NAME = exports.SEMRESATTRS_CONTAINER_RUNTIME = exports.SEMRESATTRS_CONTAINER_ID = exports.SEMRESATTRS_CONTAINER_NAME = exports.SEMRESATTRS_AWS_LOG_STREAM_ARNS = exports.SEMRESATTRS_AWS_LOG_STREAM_NAMES = exports.SEMRESATTRS_AWS_LOG_GROUP_ARNS = exports.SEMRESATTRS_AWS_LOG_GROUP_NAMES = exports.SEMRESATTRS_AWS_EKS_CLUSTER_ARN = exports.SEMRESATTRS_AWS_ECS_TASK_REVISION = exports.SEMRESATTRS_AWS_ECS_TASK_FAMILY = exports.SEMRESATTRS_AWS_ECS_TASK_ARN = exports.SEMRESATTRS_AWS_ECS_LAUNCHTYPE = exports.SEMRESATTRS_AWS_ECS_CLUSTER_ARN = exports.SEMRESATTRS_AWS_ECS_CONTAINER_ARN = exports.SEMRESATTRS_CLOUD_PLATFORM = exports.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = exports.SEMRESATTRS_CLOUD_REGION = exports.SEMRESATTRS_CLOUD_ACCOUNT_ID = exports.SEMRESATTRS_CLOUD_PROVIDER = void 0;
exports.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = exports.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = exports.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = exports.CLOUDPLATFORMVALUES_AZURE_AKS = exports.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = exports.CLOUDPLATFORMVALUES_AZURE_VM = exports.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = exports.CLOUDPLATFORMVALUES_AWS_LAMBDA = exports.CLOUDPLATFORMVALUES_AWS_EKS = exports.CLOUDPLATFORMVALUES_AWS_ECS = exports.CLOUDPLATFORMVALUES_AWS_EC2 = exports.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = exports.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = exports.CloudProviderValues = exports.CLOUDPROVIDERVALUES_GCP = exports.CLOUDPROVIDERVALUES_AZURE = exports.CLOUDPROVIDERVALUES_AWS = exports.CLOUDPROVIDERVALUES_ALIBABA_CLOUD = exports.SemanticResourceAttributes = exports.SEMRESATTRS_WEBENGINE_DESCRIPTION = exports.SEMRESATTRS_WEBENGINE_VERSION = exports.SEMRESATTRS_WEBENGINE_NAME = exports.SEMRESATTRS_TELEMETRY_AUTO_VERSION = exports.SEMRESATTRS_TELEMETRY_SDK_VERSION = exports.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = exports.SEMRESATTRS_TELEMETRY_SDK_NAME = exports.SEMRESATTRS_SERVICE_VERSION = exports.SEMRESATTRS_SERVICE_INSTANCE_ID = exports.SEMRESATTRS_SERVICE_NAMESPACE = exports.SEMRESATTRS_SERVICE_NAME = exports.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = exports.SEMRESATTRS_PROCESS_RUNTIME_VERSION = exports.SEMRESATTRS_PROCESS_RUNTIME_NAME = exports.SEMRESATTRS_PROCESS_OWNER = exports.SEMRESATTRS_PROCESS_COMMAND_ARGS = exports.SEMRESATTRS_PROCESS_COMMAND_LINE = exports.SEMRESATTRS_PROCESS_COMMAND = exports.SEMRESATTRS_PROCESS_EXECUTABLE_PATH = exports.SEMRESATTRS_PROCESS_EXECUTABLE_NAME = exports.SEMRESATTRS_PROCESS_PID = exports.SEMRESATTRS_OS_VERSION = exports.SEMRESATTRS_OS_NAME = exports.SEMRESATTRS_OS_DESCRIPTION = exports.SEMRESATTRS_OS_TYPE = exports.SEMRESATTRS_K8S_CRONJOB_NAME = exports.SEMRESATTRS_K8S_CRONJOB_UID = exports.SEMRESATTRS_K8S_JOB_NAME = exports.SEMRESATTRS_K8S_JOB_UID = exports.SEMRESATTRS_K8S_DAEMONSET_NAME = exports.SEMRESATTRS_K8S_DAEMONSET_UID = void 0;
exports.TelemetrySdkLanguageValues = exports.TELEMETRYSDKLANGUAGEVALUES_WEBJS = exports.TELEMETRYSDKLANGUAGEVALUES_RUBY = exports.TELEMETRYSDKLANGUAGEVALUES_PYTHON = exports.TELEMETRYSDKLANGUAGEVALUES_PHP = exports.TELEMETRYSDKLANGUAGEVALUES_NODEJS = exports.TELEMETRYSDKLANGUAGEVALUES_JAVA = exports.TELEMETRYSDKLANGUAGEVALUES_GO = exports.TELEMETRYSDKLANGUAGEVALUES_ERLANG = exports.TELEMETRYSDKLANGUAGEVALUES_DOTNET = exports.TELEMETRYSDKLANGUAGEVALUES_CPP = exports.OsTypeValues = exports.OSTYPEVALUES_Z_OS = exports.OSTYPEVALUES_SOLARIS = exports.OSTYPEVALUES_AIX = exports.OSTYPEVALUES_HPUX = exports.OSTYPEVALUES_DRAGONFLYBSD = exports.OSTYPEVALUES_OPENBSD = exports.OSTYPEVALUES_NETBSD = exports.OSTYPEVALUES_FREEBSD = exports.OSTYPEVALUES_DARWIN = exports.OSTYPEVALUES_LINUX = exports.OSTYPEVALUES_WINDOWS = exports.HostArchValues = exports.HOSTARCHVALUES_X86 = exports.HOSTARCHVALUES_PPC64 = exports.HOSTARCHVALUES_PPC32 = exports.HOSTARCHVALUES_IA64 = exports.HOSTARCHVALUES_ARM64 = exports.HOSTARCHVALUES_ARM32 = exports.HOSTARCHVALUES_AMD64 = exports.AwsEcsLaunchtypeValues = exports.AWSECSLAUNCHTYPEVALUES_FARGATE = exports.AWSECSLAUNCHTYPEVALUES_EC2 = exports.CloudPlatformValues = exports.CLOUDPLATFORMVALUES_GCP_APP_ENGINE = exports.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = exports.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = exports.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = void 0;
const utils_1 = require("../internal/utils");
//----------------------------------------------------------------------------------------------------------
// DO NOT EDIT, this is an Auto-generated file from scripts/semconv/templates//templates/SemanticAttributes.ts.j2
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
// Constant values for SemanticResourceAttributes
//----------------------------------------------------------------------------------------------------------
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
const TMP_CLOUD_PROVIDER = 'cloud.provider';
const TMP_CLOUD_ACCOUNT_ID = 'cloud.account.id';
const TMP_CLOUD_REGION = 'cloud.region';
const TMP_CLOUD_AVAILABILITY_ZONE = 'cloud.availability_zone';
const TMP_CLOUD_PLATFORM = 'cloud.platform';
const TMP_AWS_ECS_CONTAINER_ARN = 'aws.ecs.container.arn';
const TMP_AWS_ECS_CLUSTER_ARN = 'aws.ecs.cluster.arn';
const TMP_AWS_ECS_LAUNCHTYPE = 'aws.ecs.launchtype';
const TMP_AWS_ECS_TASK_ARN = 'aws.ecs.task.arn';
const TMP_AWS_ECS_TASK_FAMILY = 'aws.ecs.task.family';
const TMP_AWS_ECS_TASK_REVISION = 'aws.ecs.task.revision';
const TMP_AWS_EKS_CLUSTER_ARN = 'aws.eks.cluster.arn';
const TMP_AWS_LOG_GROUP_NAMES = 'aws.log.group.names';
const TMP_AWS_LOG_GROUP_ARNS = 'aws.log.group.arns';
const TMP_AWS_LOG_STREAM_NAMES = 'aws.log.stream.names';
const TMP_AWS_LOG_STREAM_ARNS = 'aws.log.stream.arns';
const TMP_CONTAINER_NAME = 'container.name';
const TMP_CONTAINER_ID = 'container.id';
const TMP_CONTAINER_RUNTIME = 'container.runtime';
const TMP_CONTAINER_IMAGE_NAME = 'container.image.name';
const TMP_CONTAINER_IMAGE_TAG = 'container.image.tag';
const TMP_DEPLOYMENT_ENVIRONMENT = 'deployment.environment';
const TMP_DEVICE_ID = 'device.id';
const TMP_DEVICE_MODEL_IDENTIFIER = 'device.model.identifier';
const TMP_DEVICE_MODEL_NAME = 'device.model.name';
const TMP_FAAS_NAME = 'faas.name';
const TMP_FAAS_ID = 'faas.id';
const TMP_FAAS_VERSION = 'faas.version';
const TMP_FAAS_INSTANCE = 'faas.instance';
const TMP_FAAS_MAX_MEMORY = 'faas.max_memory';
const TMP_HOST_ID = 'host.id';
const TMP_HOST_NAME = 'host.name';
const TMP_HOST_TYPE = 'host.type';
const TMP_HOST_ARCH = 'host.arch';
const TMP_HOST_IMAGE_NAME = 'host.image.name';
const TMP_HOST_IMAGE_ID = 'host.image.id';
const TMP_HOST_IMAGE_VERSION = 'host.image.version';
const TMP_K8S_CLUSTER_NAME = 'k8s.cluster.name';
const TMP_K8S_NODE_NAME = 'k8s.node.name';
const TMP_K8S_NODE_UID = 'k8s.node.uid';
const TMP_K8S_NAMESPACE_NAME = 'k8s.namespace.name';
const TMP_K8S_POD_UID = 'k8s.pod.uid';
const TMP_K8S_POD_NAME = 'k8s.pod.name';
const TMP_K8S_CONTAINER_NAME = 'k8s.container.name';
const TMP_K8S_REPLICASET_UID = 'k8s.replicaset.uid';
const TMP_K8S_REPLICASET_NAME = 'k8s.replicaset.name';
const TMP_K8S_DEPLOYMENT_UID = 'k8s.deployment.uid';
const TMP_K8S_DEPLOYMENT_NAME = 'k8s.deployment.name';
const TMP_K8S_STATEFULSET_UID = 'k8s.statefulset.uid';
const TMP_K8S_STATEFULSET_NAME = 'k8s.statefulset.name';
const TMP_K8S_DAEMONSET_UID = 'k8s.daemonset.uid';
const TMP_K8S_DAEMONSET_NAME = 'k8s.daemonset.name';
const TMP_K8S_JOB_UID = 'k8s.job.uid';
const TMP_K8S_JOB_NAME = 'k8s.job.name';
const TMP_K8S_CRONJOB_UID = 'k8s.cronjob.uid';
const TMP_K8S_CRONJOB_NAME = 'k8s.cronjob.name';
const TMP_OS_TYPE = 'os.type';
const TMP_OS_DESCRIPTION = 'os.description';
const TMP_OS_NAME = 'os.name';
const TMP_OS_VERSION = 'os.version';
const TMP_PROCESS_PID = 'process.pid';
const TMP_PROCESS_EXECUTABLE_NAME = 'process.executable.name';
const TMP_PROCESS_EXECUTABLE_PATH = 'process.executable.path';
const TMP_PROCESS_COMMAND = 'process.command';
const TMP_PROCESS_COMMAND_LINE = 'process.command_line';
const TMP_PROCESS_COMMAND_ARGS = 'process.command_args';
const TMP_PROCESS_OWNER = 'process.owner';
const TMP_PROCESS_RUNTIME_NAME = 'process.runtime.name';
const TMP_PROCESS_RUNTIME_VERSION = 'process.runtime.version';
const TMP_PROCESS_RUNTIME_DESCRIPTION = 'process.runtime.description';
const TMP_SERVICE_NAME = 'service.name';
const TMP_SERVICE_NAMESPACE = 'service.namespace';
const TMP_SERVICE_INSTANCE_ID = 'service.instance.id';
const TMP_SERVICE_VERSION = 'service.version';
const TMP_TELEMETRY_SDK_NAME = 'telemetry.sdk.name';
const TMP_TELEMETRY_SDK_LANGUAGE = 'telemetry.sdk.language';
const TMP_TELEMETRY_SDK_VERSION = 'telemetry.sdk.version';
const TMP_TELEMETRY_AUTO_VERSION = 'telemetry.auto.version';
const TMP_WEBENGINE_NAME = 'webengine.name';
const TMP_WEBENGINE_VERSION = 'webengine.version';
const TMP_WEBENGINE_DESCRIPTION = 'webengine.description';
/**
 * Name of the cloud provider.
 */
exports.SEMRESATTRS_CLOUD_PROVIDER = TMP_CLOUD_PROVIDER;
/**
 * The cloud account ID the resource is assigned to.
 */
exports.SEMRESATTRS_CLOUD_ACCOUNT_ID = TMP_CLOUD_ACCOUNT_ID;
/**
 * The geographical region the resource is running. Refer to your provider&#39;s docs to see the available regions, for example [Alibaba Cloud regions](https://www.alibabacloud.com/help/doc-detail/40654.htm), [AWS regions](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/), [Azure regions](https://azure.microsoft.com/en-us/global-infrastructure/geographies/), or [Google Cloud regions](https://cloud.google.com/about/locations).
 */
exports.SEMRESATTRS_CLOUD_REGION = TMP_CLOUD_REGION;
/**
 * Cloud regions often have multiple, isolated locations known as zones to increase availability. Availability zone represents the zone where the resource is running.
 *
 * Note: Availability zones are called &#34;zones&#34; on Alibaba Cloud and Google Cloud.
 */
exports.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = TMP_CLOUD_AVAILABILITY_ZONE;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.SEMRESATTRS_CLOUD_PLATFORM = TMP_CLOUD_PLATFORM;
/**
 * The Amazon Resource Name (ARN) of an [ECS container instance](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html).
 */
exports.SEMRESATTRS_AWS_ECS_CONTAINER_ARN = TMP_AWS_ECS_CONTAINER_ARN;
/**
 * The ARN of an [ECS cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html).
 */
exports.SEMRESATTRS_AWS_ECS_CLUSTER_ARN = TMP_AWS_ECS_CLUSTER_ARN;
/**
 * The [launch type](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) for an ECS task.
 */
exports.SEMRESATTRS_AWS_ECS_LAUNCHTYPE = TMP_AWS_ECS_LAUNCHTYPE;
/**
 * The ARN of an [ECS task definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html).
 */
exports.SEMRESATTRS_AWS_ECS_TASK_ARN = TMP_AWS_ECS_TASK_ARN;
/**
 * The task definition family this task definition is a member of.
 */
exports.SEMRESATTRS_AWS_ECS_TASK_FAMILY = TMP_AWS_ECS_TASK_FAMILY;
/**
 * The revision for this task definition.
 */
exports.SEMRESATTRS_AWS_ECS_TASK_REVISION = TMP_AWS_ECS_TASK_REVISION;
/**
 * The ARN of an EKS cluster.
 */
exports.SEMRESATTRS_AWS_EKS_CLUSTER_ARN = TMP_AWS_EKS_CLUSTER_ARN;
/**
 * The name(s) of the AWS log group(s) an application is writing to.
 *
 * Note: Multiple log groups must be supported for cases like multi-container applications, where a single application has sidecar containers, and each write to their own log group.
 */
exports.SEMRESATTRS_AWS_LOG_GROUP_NAMES = TMP_AWS_LOG_GROUP_NAMES;
/**
 * The Amazon Resource Name(s) (ARN) of the AWS log group(s).
 *
 * Note: See the [log group ARN format documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/iam-access-control-overview-cwl.html#CWL_ARN_Format).
 */
exports.SEMRESATTRS_AWS_LOG_GROUP_ARNS = TMP_AWS_LOG_GROUP_ARNS;
/**
 * The name(s) of the AWS log stream(s) an application is writing to.
 */
exports.SEMRESATTRS_AWS_LOG_STREAM_NAMES = TMP_AWS_LOG_STREAM_NAMES;
/**
 * The ARN(s) of the AWS log stream(s).
 *
 * Note: See the [log stream ARN format documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/iam-access-control-overview-cwl.html#CWL_ARN_Format). One log group can contain several log streams, so these ARNs necessarily identify both a log group and a log stream.
 */
exports.SEMRESATTRS_AWS_LOG_STREAM_ARNS = TMP_AWS_LOG_STREAM_ARNS;
/**
 * Container name.
 */
exports.SEMRESATTRS_CONTAINER_NAME = TMP_CONTAINER_NAME;
/**
 * Container ID. Usually a UUID, as for example used to [identify Docker containers](https://docs.docker.com/engine/reference/run/#container-identification). The UUID might be abbreviated.
 */
exports.SEMRESATTRS_CONTAINER_ID = TMP_CONTAINER_ID;
/**
 * The container runtime managing this container.
 */
exports.SEMRESATTRS_CONTAINER_RUNTIME = TMP_CONTAINER_RUNTIME;
/**
 * Name of the image the container was built on.
 */
exports.SEMRESATTRS_CONTAINER_IMAGE_NAME = TMP_CONTAINER_IMAGE_NAME;
/**
 * Container image tag.
 */
exports.SEMRESATTRS_CONTAINER_IMAGE_TAG = TMP_CONTAINER_IMAGE_TAG;
/**
 * Name of the [deployment environment](https://en.wikipedia.org/wiki/Deployment_environment) (aka deployment tier).
 */
exports.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = TMP_DEPLOYMENT_ENVIRONMENT;
/**
 * A unique identifier representing the device.
 *
 * Note: The device identifier MUST only be defined using the values outlined below. This value is not an advertising identifier and MUST NOT be used as such. On iOS (Swift or Objective-C), this value MUST be equal to the [vendor identifier](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor). On Android (Java or Kotlin), this value MUST be equal to the Firebase Installation ID or a globally unique UUID which is persisted across sessions in your application. More information can be found [here](https://developer.android.com/training/articles/user-data-ids) on best practices and exact implementation details. Caution should be taken when storing personal data or anything which can identify a user. GDPR and data protection laws may apply, ensure you do your own due diligence.
 */
exports.SEMRESATTRS_DEVICE_ID = TMP_DEVICE_ID;
/**
 * The model identifier for the device.
 *
 * Note: It&#39;s recommended this value represents a machine readable version of the model identifier rather than the market or consumer-friendly name of the device.
 */
exports.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = TMP_DEVICE_MODEL_IDENTIFIER;
/**
 * The marketing name for the device model.
 *
 * Note: It&#39;s recommended this value represents a human readable version of the device model rather than a machine readable alternative.
 */
exports.SEMRESATTRS_DEVICE_MODEL_NAME = TMP_DEVICE_MODEL_NAME;
/**
 * The name of the single function that this runtime instance executes.
 *
 * Note: This is the name of the function as configured/deployed on the FaaS platform and is usually different from the name of the callback function (which may be stored in the [`code.namespace`/`code.function`](../../trace/semantic_conventions/span-general.md#source-code-attributes) span attributes).
 */
exports.SEMRESATTRS_FAAS_NAME = TMP_FAAS_NAME;
/**
* The unique ID of the single function that this runtime instance executes.
*
* Note: Depending on the cloud provider, use:

* **AWS Lambda:** The function [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
Take care not to use the &#34;invoked ARN&#34; directly but replace any
[alias suffix](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html) with the resolved function version, as the same runtime instance may be invokable with multiple
different aliases.
* **GCP:** The [URI of the resource](https://cloud.google.com/iam/docs/full-resource-names)
* **Azure:** The [Fully Qualified Resource ID](https://docs.microsoft.com/en-us/rest/api/resources/resources/get-by-id).

On some providers, it may not be possible to determine the full ID at startup,
which is why this field cannot be made required. For example, on AWS the account ID
part of the ARN is not available without calling another AWS API
which may be deemed too slow for a short-running lambda function.
As an alternative, consider setting `faas.id` as a span attribute instead.
*/
exports.SEMRESATTRS_FAAS_ID = TMP_FAAS_ID;
/**
* The immutable version of the function being executed.
*
* Note: Depending on the cloud provider and platform, use:

* **AWS Lambda:** The [function version](https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html)
  (an integer represented as a decimal string).
* **Google Cloud Run:** The [revision](https://cloud.google.com/run/docs/managing/revisions)
  (i.e., the function name plus the revision suffix).
* **Google Cloud Functions:** The value of the
  [`K_REVISION` environment variable](https://cloud.google.com/functions/docs/env-var#runtime_environment_variables_set_automatically).
* **Azure Functions:** Not applicable. Do not set this attribute.
*/
exports.SEMRESATTRS_FAAS_VERSION = TMP_FAAS_VERSION;
/**
 * The execution environment ID as a string, that will be potentially reused for other invocations to the same function/function version.
 *
 * Note: * **AWS Lambda:** Use the (full) log stream name.
 */
exports.SEMRESATTRS_FAAS_INSTANCE = TMP_FAAS_INSTANCE;
/**
 * The amount of memory available to the serverless function in MiB.
 *
 * Note: It&#39;s recommended to set this attribute since e.g. too little memory can easily stop a Java AWS Lambda function from working correctly. On AWS Lambda, the environment variable `AWS_LAMBDA_FUNCTION_MEMORY_SIZE` provides this information.
 */
exports.SEMRESATTRS_FAAS_MAX_MEMORY = TMP_FAAS_MAX_MEMORY;
/**
 * Unique host ID. For Cloud, this must be the instance_id assigned by the cloud provider.
 */
exports.SEMRESATTRS_HOST_ID = TMP_HOST_ID;
/**
 * Name of the host. On Unix systems, it may contain what the hostname command returns, or the fully qualified hostname, or another name specified by the user.
 */
exports.SEMRESATTRS_HOST_NAME = TMP_HOST_NAME;
/**
 * Type of host. For Cloud, this must be the machine type.
 */
exports.SEMRESATTRS_HOST_TYPE = TMP_HOST_TYPE;
/**
 * The CPU architecture the host system is running on.
 */
exports.SEMRESATTRS_HOST_ARCH = TMP_HOST_ARCH;
/**
 * Name of the VM image or OS install the host was instantiated from.
 */
exports.SEMRESATTRS_HOST_IMAGE_NAME = TMP_HOST_IMAGE_NAME;
/**
 * VM image ID. For Cloud, this value is from the provider.
 */
exports.SEMRESATTRS_HOST_IMAGE_ID = TMP_HOST_IMAGE_ID;
/**
 * The version string of the VM image as defined in [Version Attributes](README.md#version-attributes).
 */
exports.SEMRESATTRS_HOST_IMAGE_VERSION = TMP_HOST_IMAGE_VERSION;
/**
 * The name of the cluster.
 */
exports.SEMRESATTRS_K8S_CLUSTER_NAME = TMP_K8S_CLUSTER_NAME;
/**
 * The name of the Node.
 */
exports.SEMRESATTRS_K8S_NODE_NAME = TMP_K8S_NODE_NAME;
/**
 * The UID of the Node.
 */
exports.SEMRESATTRS_K8S_NODE_UID = TMP_K8S_NODE_UID;
/**
 * The name of the namespace that the pod is running in.
 */
exports.SEMRESATTRS_K8S_NAMESPACE_NAME = TMP_K8S_NAMESPACE_NAME;
/**
 * The UID of the Pod.
 */
exports.SEMRESATTRS_K8S_POD_UID = TMP_K8S_POD_UID;
/**
 * The name of the Pod.
 */
exports.SEMRESATTRS_K8S_POD_NAME = TMP_K8S_POD_NAME;
/**
 * The name of the Container in a Pod template.
 */
exports.SEMRESATTRS_K8S_CONTAINER_NAME = TMP_K8S_CONTAINER_NAME;
/**
 * The UID of the ReplicaSet.
 */
exports.SEMRESATTRS_K8S_REPLICASET_UID = TMP_K8S_REPLICASET_UID;
/**
 * The name of the ReplicaSet.
 */
exports.SEMRESATTRS_K8S_REPLICASET_NAME = TMP_K8S_REPLICASET_NAME;
/**
 * The UID of the Deployment.
 */
exports.SEMRESATTRS_K8S_DEPLOYMENT_UID = TMP_K8S_DEPLOYMENT_UID;
/**
 * The name of the Deployment.
 */
exports.SEMRESATTRS_K8S_DEPLOYMENT_NAME = TMP_K8S_DEPLOYMENT_NAME;
/**
 * The UID of the StatefulSet.
 */
exports.SEMRESATTRS_K8S_STATEFULSET_UID = TMP_K8S_STATEFULSET_UID;
/**
 * The name of the StatefulSet.
 */
exports.SEMRESATTRS_K8S_STATEFULSET_NAME = TMP_K8S_STATEFULSET_NAME;
/**
 * The UID of the DaemonSet.
 */
exports.SEMRESATTRS_K8S_DAEMONSET_UID = TMP_K8S_DAEMONSET_UID;
/**
 * The name of the DaemonSet.
 */
exports.SEMRESATTRS_K8S_DAEMONSET_NAME = TMP_K8S_DAEMONSET_NAME;
/**
 * The UID of the Job.
 */
exports.SEMRESATTRS_K8S_JOB_UID = TMP_K8S_JOB_UID;
/**
 * The name of the Job.
 */
exports.SEMRESATTRS_K8S_JOB_NAME = TMP_K8S_JOB_NAME;
/**
 * The UID of the CronJob.
 */
exports.SEMRESATTRS_K8S_CRONJOB_UID = TMP_K8S_CRONJOB_UID;
/**
 * The name of the CronJob.
 */
exports.SEMRESATTRS_K8S_CRONJOB_NAME = TMP_K8S_CRONJOB_NAME;
/**
 * The operating system type.
 */
exports.SEMRESATTRS_OS_TYPE = TMP_OS_TYPE;
/**
 * Human readable (not intended to be parsed) OS version information, like e.g. reported by `ver` or `lsb_release -a` commands.
 */
exports.SEMRESATTRS_OS_DESCRIPTION = TMP_OS_DESCRIPTION;
/**
 * Human readable operating system name.
 */
exports.SEMRESATTRS_OS_NAME = TMP_OS_NAME;
/**
 * The version string of the operating system as defined in [Version Attributes](../../resource/semantic_conventions/README.md#version-attributes).
 */
exports.SEMRESATTRS_OS_VERSION = TMP_OS_VERSION;
/**
 * Process identifier (PID).
 */
exports.SEMRESATTRS_PROCESS_PID = TMP_PROCESS_PID;
/**
 * The name of the process executable. On Linux based systems, can be set to the `Name` in `proc/[pid]/status`. On Windows, can be set to the base name of `GetProcessImageFileNameW`.
 */
exports.SEMRESATTRS_PROCESS_EXECUTABLE_NAME = TMP_PROCESS_EXECUTABLE_NAME;
/**
 * The full path to the process executable. On Linux based systems, can be set to the target of `proc/[pid]/exe`. On Windows, can be set to the result of `GetProcessImageFileNameW`.
 */
exports.SEMRESATTRS_PROCESS_EXECUTABLE_PATH = TMP_PROCESS_EXECUTABLE_PATH;
/**
 * The command used to launch the process (i.e. the command name). On Linux based systems, can be set to the zeroth string in `proc/[pid]/cmdline`. On Windows, can be set to the first parameter extracted from `GetCommandLineW`.
 */
exports.SEMRESATTRS_PROCESS_COMMAND = TMP_PROCESS_COMMAND;
/**
 * The full command used to launch the process as a single string representing the full command. On Windows, can be set to the result of `GetCommandLineW`. Do not set this if you have to assemble it just for monitoring; use `process.command_args` instead.
 */
exports.SEMRESATTRS_PROCESS_COMMAND_LINE = TMP_PROCESS_COMMAND_LINE;
/**
 * All the command arguments (including the command/executable itself) as received by the process. On Linux-based systems (and some other Unixoid systems supporting procfs), can be set according to the list of null-delimited strings extracted from `proc/[pid]/cmdline`. For libc-based executables, this would be the full argv vector passed to `main`.
 */
exports.SEMRESATTRS_PROCESS_COMMAND_ARGS = TMP_PROCESS_COMMAND_ARGS;
/**
 * The username of the user that owns the process.
 */
exports.SEMRESATTRS_PROCESS_OWNER = TMP_PROCESS_OWNER;
/**
 * The name of the runtime of this process. For compiled native binaries, this SHOULD be the name of the compiler.
 */
exports.SEMRESATTRS_PROCESS_RUNTIME_NAME = TMP_PROCESS_RUNTIME_NAME;
/**
 * The version of the runtime of this process, as returned by the runtime without modification.
 */
exports.SEMRESATTRS_PROCESS_RUNTIME_VERSION = TMP_PROCESS_RUNTIME_VERSION;
/**
 * An additional description about the runtime of the process, for example a specific vendor customization of the runtime environment.
 */
exports.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = TMP_PROCESS_RUNTIME_DESCRIPTION;
/**
 * Logical name of the service.
 *
 * Note: MUST be the same for all instances of horizontally scaled services. If the value was not specified, SDKs MUST fallback to `unknown_service:` concatenated with [`process.executable.name`](process.md#process), e.g. `unknown_service:bash`. If `process.executable.name` is not available, the value MUST be set to `unknown_service`.
 */
exports.SEMRESATTRS_SERVICE_NAME = TMP_SERVICE_NAME;
/**
 * A namespace for `service.name`.
 *
 * Note: A string value having a meaning that helps to distinguish a group of services, for example the team name that owns a group of services. `service.name` is expected to be unique within the same namespace. If `service.namespace` is not specified in the Resource then `service.name` is expected to be unique for all services that have no explicit namespace defined (so the empty/unspecified namespace is simply one more valid namespace). Zero-length namespace string is assumed equal to unspecified namespace.
 */
exports.SEMRESATTRS_SERVICE_NAMESPACE = TMP_SERVICE_NAMESPACE;
/**
 * The string ID of the service instance.
 *
 * Note: MUST be unique for each instance of the same `service.namespace,service.name` pair (in other words `service.namespace,service.name,service.instance.id` triplet MUST be globally unique). The ID helps to distinguish instances of the same service that exist at the same time (e.g. instances of a horizontally scaled service). It is preferable for the ID to be persistent and stay the same for the lifetime of the service instance, however it is acceptable that the ID is ephemeral and changes during important lifetime events for the service (e.g. service restarts). If the service has no inherent unique ID that can be used as the value of this attribute it is recommended to generate a random Version 1 or Version 4 RFC 4122 UUID (services aiming for reproducible UUIDs may also use Version 5, see RFC 4122 for more recommendations).
 */
exports.SEMRESATTRS_SERVICE_INSTANCE_ID = TMP_SERVICE_INSTANCE_ID;
/**
 * The version string of the service API or implementation.
 */
exports.SEMRESATTRS_SERVICE_VERSION = TMP_SERVICE_VERSION;
/**
 * The name of the telemetry SDK as defined above.
 */
exports.SEMRESATTRS_TELEMETRY_SDK_NAME = TMP_TELEMETRY_SDK_NAME;
/**
 * The language of the telemetry SDK.
 */
exports.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = TMP_TELEMETRY_SDK_LANGUAGE;
/**
 * The version string of the telemetry SDK.
 */
exports.SEMRESATTRS_TELEMETRY_SDK_VERSION = TMP_TELEMETRY_SDK_VERSION;
/**
 * The version string of the auto instrumentation agent, if used.
 */
exports.SEMRESATTRS_TELEMETRY_AUTO_VERSION = TMP_TELEMETRY_AUTO_VERSION;
/**
 * The name of the web engine.
 */
exports.SEMRESATTRS_WEBENGINE_NAME = TMP_WEBENGINE_NAME;
/**
 * The version of the web engine.
 */
exports.SEMRESATTRS_WEBENGINE_VERSION = TMP_WEBENGINE_VERSION;
/**
 * Additional description of the web engine (e.g. detailed version and edition information).
 */
exports.SEMRESATTRS_WEBENGINE_DESCRIPTION = TMP_WEBENGINE_DESCRIPTION;
/**
 * Create exported Value Map for SemanticResourceAttributes values
 * @deprecated Use the SEMRESATTRS_XXXXX constants rather than the SemanticResourceAttributes.XXXXX for bundle minification
 */
exports.SemanticResourceAttributes = 
/*#__PURE__*/ (0, utils_1.createConstMap)([
    TMP_CLOUD_PROVIDER,
    TMP_CLOUD_ACCOUNT_ID,
    TMP_CLOUD_REGION,
    TMP_CLOUD_AVAILABILITY_ZONE,
    TMP_CLOUD_PLATFORM,
    TMP_AWS_ECS_CONTAINER_ARN,
    TMP_AWS_ECS_CLUSTER_ARN,
    TMP_AWS_ECS_LAUNCHTYPE,
    TMP_AWS_ECS_TASK_ARN,
    TMP_AWS_ECS_TASK_FAMILY,
    TMP_AWS_ECS_TASK_REVISION,
    TMP_AWS_EKS_CLUSTER_ARN,
    TMP_AWS_LOG_GROUP_NAMES,
    TMP_AWS_LOG_GROUP_ARNS,
    TMP_AWS_LOG_STREAM_NAMES,
    TMP_AWS_LOG_STREAM_ARNS,
    TMP_CONTAINER_NAME,
    TMP_CONTAINER_ID,
    TMP_CONTAINER_RUNTIME,
    TMP_CONTAINER_IMAGE_NAME,
    TMP_CONTAINER_IMAGE_TAG,
    TMP_DEPLOYMENT_ENVIRONMENT,
    TMP_DEVICE_ID,
    TMP_DEVICE_MODEL_IDENTIFIER,
    TMP_DEVICE_MODEL_NAME,
    TMP_FAAS_NAME,
    TMP_FAAS_ID,
    TMP_FAAS_VERSION,
    TMP_FAAS_INSTANCE,
    TMP_FAAS_MAX_MEMORY,
    TMP_HOST_ID,
    TMP_HOST_NAME,
    TMP_HOST_TYPE,
    TMP_HOST_ARCH,
    TMP_HOST_IMAGE_NAME,
    TMP_HOST_IMAGE_ID,
    TMP_HOST_IMAGE_VERSION,
    TMP_K8S_CLUSTER_NAME,
    TMP_K8S_NODE_NAME,
    TMP_K8S_NODE_UID,
    TMP_K8S_NAMESPACE_NAME,
    TMP_K8S_POD_UID,
    TMP_K8S_POD_NAME,
    TMP_K8S_CONTAINER_NAME,
    TMP_K8S_REPLICASET_UID,
    TMP_K8S_REPLICASET_NAME,
    TMP_K8S_DEPLOYMENT_UID,
    TMP_K8S_DEPLOYMENT_NAME,
    TMP_K8S_STATEFULSET_UID,
    TMP_K8S_STATEFULSET_NAME,
    TMP_K8S_DAEMONSET_UID,
    TMP_K8S_DAEMONSET_NAME,
    TMP_K8S_JOB_UID,
    TMP_K8S_JOB_NAME,
    TMP_K8S_CRONJOB_UID,
    TMP_K8S_CRONJOB_NAME,
    TMP_OS_TYPE,
    TMP_OS_DESCRIPTION,
    TMP_OS_NAME,
    TMP_OS_VERSION,
    TMP_PROCESS_PID,
    TMP_PROCESS_EXECUTABLE_NAME,
    TMP_PROCESS_EXECUTABLE_PATH,
    TMP_PROCESS_COMMAND,
    TMP_PROCESS_COMMAND_LINE,
    TMP_PROCESS_COMMAND_ARGS,
    TMP_PROCESS_OWNER,
    TMP_PROCESS_RUNTIME_NAME,
    TMP_PROCESS_RUNTIME_VERSION,
    TMP_PROCESS_RUNTIME_DESCRIPTION,
    TMP_SERVICE_NAME,
    TMP_SERVICE_NAMESPACE,
    TMP_SERVICE_INSTANCE_ID,
    TMP_SERVICE_VERSION,
    TMP_TELEMETRY_SDK_NAME,
    TMP_TELEMETRY_SDK_LANGUAGE,
    TMP_TELEMETRY_SDK_VERSION,
    TMP_TELEMETRY_AUTO_VERSION,
    TMP_WEBENGINE_NAME,
    TMP_WEBENGINE_VERSION,
    TMP_WEBENGINE_DESCRIPTION,
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for CloudProviderValues enum definition
 *
 * Name of the cloud provider.
 * ---------------------------------------------------------------------------------------------------------- */
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
const TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD = 'alibaba_cloud';
const TMP_CLOUDPROVIDERVALUES_AWS = 'aws';
const TMP_CLOUDPROVIDERVALUES_AZURE = 'azure';
const TMP_CLOUDPROVIDERVALUES_GCP = 'gcp';
/**
 * Name of the cloud provider.
 */
exports.CLOUDPROVIDERVALUES_ALIBABA_CLOUD = TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD;
/**
 * Name of the cloud provider.
 */
exports.CLOUDPROVIDERVALUES_AWS = TMP_CLOUDPROVIDERVALUES_AWS;
/**
 * Name of the cloud provider.
 */
exports.CLOUDPROVIDERVALUES_AZURE = TMP_CLOUDPROVIDERVALUES_AZURE;
/**
 * Name of the cloud provider.
 */
exports.CLOUDPROVIDERVALUES_GCP = TMP_CLOUDPROVIDERVALUES_GCP;
/**
 * The constant map of values for CloudProviderValues.
 * @deprecated Use the CLOUDPROVIDERVALUES_XXXXX constants rather than the CloudProviderValues.XXXXX for bundle minification.
 */
exports.CloudProviderValues = 
/*#__PURE__*/ (0, utils_1.createConstMap)([
    TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD,
    TMP_CLOUDPROVIDERVALUES_AWS,
    TMP_CLOUDPROVIDERVALUES_AZURE,
    TMP_CLOUDPROVIDERVALUES_GCP,
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for CloudPlatformValues enum definition
 *
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 * ---------------------------------------------------------------------------------------------------------- */
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
const TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = 'alibaba_cloud_ecs';
const TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = 'alibaba_cloud_fc';
const TMP_CLOUDPLATFORMVALUES_AWS_EC2 = 'aws_ec2';
const TMP_CLOUDPLATFORMVALUES_AWS_ECS = 'aws_ecs';
const TMP_CLOUDPLATFORMVALUES_AWS_EKS = 'aws_eks';
const TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA = 'aws_lambda';
const TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = 'aws_elastic_beanstalk';
const TMP_CLOUDPLATFORMVALUES_AZURE_VM = 'azure_vm';
const TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = 'azure_container_instances';
const TMP_CLOUDPLATFORMVALUES_AZURE_AKS = 'azure_aks';
const TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = 'azure_functions';
const TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = 'azure_app_service';
const TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = 'gcp_compute_engine';
const TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = 'gcp_cloud_run';
const TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = 'gcp_kubernetes_engine';
const TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = 'gcp_cloud_functions';
const TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE = 'gcp_app_engine';
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AWS_EC2 = TMP_CLOUDPLATFORMVALUES_AWS_EC2;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AWS_ECS = TMP_CLOUDPLATFORMVALUES_AWS_ECS;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AWS_EKS = TMP_CLOUDPLATFORMVALUES_AWS_EKS;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AWS_LAMBDA = TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AZURE_VM = TMP_CLOUDPLATFORMVALUES_AZURE_VM;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AZURE_AKS = TMP_CLOUDPLATFORMVALUES_AZURE_AKS;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS;
/**
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 */
exports.CLOUDPLATFORMVALUES_GCP_APP_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE;
/**
 * The constant map of values for CloudPlatformValues.
 * @deprecated Use the CLOUDPLATFORMVALUES_XXXXX constants rather than the CloudPlatformValues.XXXXX for bundle minification.
 */
exports.CloudPlatformValues = 
/*#__PURE__*/ (0, utils_1.createConstMap)([
    TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS,
    TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC,
    TMP_CLOUDPLATFORMVALUES_AWS_EC2,
    TMP_CLOUDPLATFORMVALUES_AWS_ECS,
    TMP_CLOUDPLATFORMVALUES_AWS_EKS,
    TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA,
    TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK,
    TMP_CLOUDPLATFORMVALUES_AZURE_VM,
    TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES,
    TMP_CLOUDPLATFORMVALUES_AZURE_AKS,
    TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS,
    TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE,
    TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE,
    TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN,
    TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE,
    TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS,
    TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE,
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for AwsEcsLaunchtypeValues enum definition
 *
 * The [launch type](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) for an ECS task.
 * ---------------------------------------------------------------------------------------------------------- */
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
const TMP_AWSECSLAUNCHTYPEVALUES_EC2 = 'ec2';
const TMP_AWSECSLAUNCHTYPEVALUES_FARGATE = 'fargate';
/**
 * The [launch type](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) for an ECS task.
 */
exports.AWSECSLAUNCHTYPEVALUES_EC2 = TMP_AWSECSLAUNCHTYPEVALUES_EC2;
/**
 * The [launch type](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) for an ECS task.
 */
exports.AWSECSLAUNCHTYPEVALUES_FARGATE = TMP_AWSECSLAUNCHTYPEVALUES_FARGATE;
/**
 * The constant map of values for AwsEcsLaunchtypeValues.
 * @deprecated Use the AWSECSLAUNCHTYPEVALUES_XXXXX constants rather than the AwsEcsLaunchtypeValues.XXXXX for bundle minification.
 */
exports.AwsEcsLaunchtypeValues = 
/*#__PURE__*/ (0, utils_1.createConstMap)([
    TMP_AWSECSLAUNCHTYPEVALUES_EC2,
    TMP_AWSECSLAUNCHTYPEVALUES_FARGATE,
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for HostArchValues enum definition
 *
 * The CPU architecture the host system is running on.
 * ---------------------------------------------------------------------------------------------------------- */
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
const TMP_HOSTARCHVALUES_AMD64 = 'amd64';
const TMP_HOSTARCHVALUES_ARM32 = 'arm32';
const TMP_HOSTARCHVALUES_ARM64 = 'arm64';
const TMP_HOSTARCHVALUES_IA64 = 'ia64';
const TMP_HOSTARCHVALUES_PPC32 = 'ppc32';
const TMP_HOSTARCHVALUES_PPC64 = 'ppc64';
const TMP_HOSTARCHVALUES_X86 = 'x86';
/**
 * The CPU architecture the host system is running on.
 */
exports.HOSTARCHVALUES_AMD64 = TMP_HOSTARCHVALUES_AMD64;
/**
 * The CPU architecture the host system is running on.
 */
exports.HOSTARCHVALUES_ARM32 = TMP_HOSTARCHVALUES_ARM32;
/**
 * The CPU architecture the host system is running on.
 */
exports.HOSTARCHVALUES_ARM64 = TMP_HOSTARCHVALUES_ARM64;
/**
 * The CPU architecture the host system is running on.
 */
exports.HOSTARCHVALUES_IA64 = TMP_HOSTARCHVALUES_IA64;
/**
 * The CPU architecture the host system is running on.
 */
exports.HOSTARCHVALUES_PPC32 = TMP_HOSTARCHVALUES_PPC32;
/**
 * The CPU architecture the host system is running on.
 */
exports.HOSTARCHVALUES_PPC64 = TMP_HOSTARCHVALUES_PPC64;
/**
 * The CPU architecture the host system is running on.
 */
exports.HOSTARCHVALUES_X86 = TMP_HOSTARCHVALUES_X86;
/**
 * The constant map of values for HostArchValues.
 * @deprecated Use the HOSTARCHVALUES_XXXXX constants rather than the HostArchValues.XXXXX for bundle minification.
 */
exports.HostArchValues = 
/*#__PURE__*/ (0, utils_1.createConstMap)([
    TMP_HOSTARCHVALUES_AMD64,
    TMP_HOSTARCHVALUES_ARM32,
    TMP_HOSTARCHVALUES_ARM64,
    TMP_HOSTARCHVALUES_IA64,
    TMP_HOSTARCHVALUES_PPC32,
    TMP_HOSTARCHVALUES_PPC64,
    TMP_HOSTARCHVALUES_X86,
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for OsTypeValues enum definition
 *
 * The operating system type.
 * ---------------------------------------------------------------------------------------------------------- */
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
const TMP_OSTYPEVALUES_WINDOWS = 'windows';
const TMP_OSTYPEVALUES_LINUX = 'linux';
const TMP_OSTYPEVALUES_DARWIN = 'darwin';
const TMP_OSTYPEVALUES_FREEBSD = 'freebsd';
const TMP_OSTYPEVALUES_NETBSD = 'netbsd';
const TMP_OSTYPEVALUES_OPENBSD = 'openbsd';
const TMP_OSTYPEVALUES_DRAGONFLYBSD = 'dragonflybsd';
const TMP_OSTYPEVALUES_HPUX = 'hpux';
const TMP_OSTYPEVALUES_AIX = 'aix';
const TMP_OSTYPEVALUES_SOLARIS = 'solaris';
const TMP_OSTYPEVALUES_Z_OS = 'z_os';
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_WINDOWS = TMP_OSTYPEVALUES_WINDOWS;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_LINUX = TMP_OSTYPEVALUES_LINUX;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_DARWIN = TMP_OSTYPEVALUES_DARWIN;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_FREEBSD = TMP_OSTYPEVALUES_FREEBSD;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_NETBSD = TMP_OSTYPEVALUES_NETBSD;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_OPENBSD = TMP_OSTYPEVALUES_OPENBSD;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_DRAGONFLYBSD = TMP_OSTYPEVALUES_DRAGONFLYBSD;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_HPUX = TMP_OSTYPEVALUES_HPUX;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_AIX = TMP_OSTYPEVALUES_AIX;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_SOLARIS = TMP_OSTYPEVALUES_SOLARIS;
/**
 * The operating system type.
 */
exports.OSTYPEVALUES_Z_OS = TMP_OSTYPEVALUES_Z_OS;
/**
 * The constant map of values for OsTypeValues.
 * @deprecated Use the OSTYPEVALUES_XXXXX constants rather than the OsTypeValues.XXXXX for bundle minification.
 */
exports.OsTypeValues = 
/*#__PURE__*/ (0, utils_1.createConstMap)([
    TMP_OSTYPEVALUES_WINDOWS,
    TMP_OSTYPEVALUES_LINUX,
    TMP_OSTYPEVALUES_DARWIN,
    TMP_OSTYPEVALUES_FREEBSD,
    TMP_OSTYPEVALUES_NETBSD,
    TMP_OSTYPEVALUES_OPENBSD,
    TMP_OSTYPEVALUES_DRAGONFLYBSD,
    TMP_OSTYPEVALUES_HPUX,
    TMP_OSTYPEVALUES_AIX,
    TMP_OSTYPEVALUES_SOLARIS,
    TMP_OSTYPEVALUES_Z_OS,
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for TelemetrySdkLanguageValues enum definition
 *
 * The language of the telemetry SDK.
 * ---------------------------------------------------------------------------------------------------------- */
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
const TMP_TELEMETRYSDKLANGUAGEVALUES_CPP = 'cpp';
const TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET = 'dotnet';
const TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG = 'erlang';
const TMP_TELEMETRYSDKLANGUAGEVALUES_GO = 'go';
const TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA = 'java';
const TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS = 'nodejs';
const TMP_TELEMETRYSDKLANGUAGEVALUES_PHP = 'php';
const TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON = 'python';
const TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY = 'ruby';
const TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS = 'webjs';
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_CPP = TMP_TELEMETRYSDKLANGUAGEVALUES_CPP;
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_DOTNET = TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET;
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_ERLANG = TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG;
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_GO = TMP_TELEMETRYSDKLANGUAGEVALUES_GO;
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_JAVA = TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA;
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_NODEJS = TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS;
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_PHP = TMP_TELEMETRYSDKLANGUAGEVALUES_PHP;
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_PYTHON = TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON;
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_RUBY = TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY;
/**
 * The language of the telemetry SDK.
 */
exports.TELEMETRYSDKLANGUAGEVALUES_WEBJS = TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS;
/**
 * The constant map of values for TelemetrySdkLanguageValues.
 * @deprecated Use the TELEMETRYSDKLANGUAGEVALUES_XXXXX constants rather than the TelemetrySdkLanguageValues.XXXXX for bundle minification.
 */
exports.TelemetrySdkLanguageValues = 
/*#__PURE__*/ (0, utils_1.createConstMap)([
    TMP_TELEMETRYSDKLANGUAGEVALUES_CPP,
    TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET,
    TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG,
    TMP_TELEMETRYSDKLANGUAGEVALUES_GO,
    TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA,
    TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS,
    TMP_TELEMETRYSDKLANGUAGEVALUES_PHP,
    TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON,
    TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY,
    TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS,
]);
//# sourceMappingURL=SemanticResourceAttributes.js.map